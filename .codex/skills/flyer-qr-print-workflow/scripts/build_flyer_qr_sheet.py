#!/usr/bin/env python3
from __future__ import annotations

import argparse
from pathlib import Path

import qrcode
from PIL import Image


def build_qr(url: str, qr_size: int, qr_pad: int) -> Image.Image:
    qr = qrcode.QRCode(border=2, box_size=10)
    qr.add_data(url)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="black", back_color="white").convert("RGBA")
    qr_img = qr_img.resize((qr_size, qr_size), Image.Resampling.NEAREST)

    card_size = qr_size + qr_pad * 2
    card = Image.new("RGBA", (card_size, card_size), (255, 255, 255, 255))
    card.alpha_composite(qr_img, (qr_pad, qr_pad))
    return card


def build_single_flyer(
    input_path: Path,
    output_path: Path,
    url: str,
    qr_x: int,
    qr_y: int,
    qr_size: int,
    qr_pad: int,
) -> None:
    base = Image.open(input_path).convert("RGBA")
    card = build_qr(url, qr_size, qr_pad)
    base.alpha_composite(card, (qr_x, qr_y))
    output_path.parent.mkdir(parents=True, exist_ok=True)
    base.convert("RGB").save(output_path, quality=95)


def build_sheet(
    single_flyer_path: Path,
    sheet_output_path: Path,
    sheet_width: int,
    sheet_height: int,
    margin_x: int,
    margin_y: int,
    col_gap: int,
    row_gap: int,
    flyer_size: int,
) -> None:
    flyer = Image.open(single_flyer_path).convert("RGB")
    resized = flyer.resize((flyer_size, flyer_size), Image.Resampling.LANCZOS)

    canvas = Image.new("RGB", (sheet_width, sheet_height), "white")
    positions = [
        (margin_x, margin_y),
        (margin_x + flyer_size + col_gap, margin_y),
        (margin_x, margin_y + flyer_size + row_gap),
        (margin_x + flyer_size + col_gap, margin_y + flyer_size + row_gap),
    ]
    for pos in positions:
        canvas.paste(resized, pos)

    sheet_output_path.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(sheet_output_path, quality=95)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--single-output", required=True, type=Path)
    parser.add_argument("--sheet-output", required=True, type=Path)
    parser.add_argument("--url", required=True)
    parser.add_argument("--qr-x", required=True, type=int)
    parser.add_argument("--qr-y", required=True, type=int)
    parser.add_argument("--qr-size", required=True, type=int)
    parser.add_argument("--qr-pad", default=6, type=int)
    parser.add_argument("--sheet-width", default=3300, type=int)
    parser.add_argument("--sheet-height", default=2550, type=int)
    parser.add_argument("--margin-x", default=390, type=int)
    parser.add_argument("--margin-y", default=15, type=int)
    parser.add_argument("--col-gap", default=40, type=int)
    parser.add_argument("--row-gap", default=20, type=int)
    parser.add_argument("--flyer-size", default=1240, type=int)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    build_single_flyer(
        input_path=args.input,
        output_path=args.single_output,
        url=args.url,
        qr_x=args.qr_x,
        qr_y=args.qr_y,
        qr_size=args.qr_size,
        qr_pad=args.qr_pad,
    )
    build_sheet(
        single_flyer_path=args.single_output,
        sheet_output_path=args.sheet_output,
        sheet_width=args.sheet_width,
        sheet_height=args.sheet_height,
        margin_x=args.margin_x,
        margin_y=args.margin_y,
        col_gap=args.col_gap,
        row_gap=args.row_gap,
        flyer_size=args.flyer_size,
    )


if __name__ == "__main__":
    main()
