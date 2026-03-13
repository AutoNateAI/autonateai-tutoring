#!/bin/bash

# Directory containing thought experiments
TARGET_DIR="thought-experiments"

echo "🚀 Starting .md to .mdx conversion in $TARGET_DIR..."

# Find all .md files and rename them to .mdx
find "$TARGET_DIR" -name "*.md" -type f | while read file; do
    new_file="${file%.md}.mdx"
    mv "$file" "$new_file"
    echo "✅ Converted: $file -> $new_file"
done

echo "🎉 Conversion complete!"
