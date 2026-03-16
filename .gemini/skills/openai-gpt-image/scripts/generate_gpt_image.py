import os
import sys
import base64
import argparse
from openai import OpenAI

def main():
    parser = argparse.ArgumentParser(description="Generate images using OpenAI gpt-image-1.5")
    parser.add_argument("--prompt", required=True, help="The prompt for the image")
    parser.add_argument("--model", default="gpt-image-1.5", help="The model to use (default: gpt-image-1.5)")
    parser.add_argument("--references", nargs="*", help="Paths to reference images for character/theme consistency")
    parser.add_argument("--output", required=True, help="Path to save the generated image")
    parser.add_argument("--size", default="1536x1024", help="Image size (default: 1536x1024 for 16:9 approx)")
    parser.add_argument("--quality", default="high", choices=["low", "medium", "high", "auto"], help="Rendering quality")
    parser.add_argument("--fidelity", default="high", choices=["low", "high"], help="Input fidelity for references")

    args = parser.parse_args()

    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("❌ Error: OPENAI_API_KEY environment variable not set.")
        sys.exit(1)

    client = OpenAI(api_key=api_key)

    image_files = []
    try:
        if args.references:
            for ref_path in args.references:
                if os.path.exists(ref_path):
                    image_files.append(open(ref_path, "rb"))
                else:
                    print(f"⚠️ Warning: Reference image not found at {ref_path}")

        print(f"🚀 Generating image with {args.model}...")
        
        if image_files:
            result = client.images.edit(
                model=args.model,
                image=image_files,
                prompt=args.prompt,
                input_fidelity=args.fidelity,
                size=args.size,
                quality=args.quality
            )
        else:
            result = client.images.generate(
                model=args.model,
                prompt=args.prompt,
                size=args.size,
                quality=args.quality
            )

        image_base64 = result.data[0].b64_json
        image_bytes = base64.b64decode(image_base64)

        with open(args.output, "wb") as f:
            f.write(image_bytes)

        print(f"✅ Image successfully saved to {args.output}")

    except Exception as e:
        print(f"❌ Error during image generation: {str(e)}")
        sys.exit(1)
    finally:
        for f in image_files:
            f.close()

if __name__ == "__main__":
    main()
