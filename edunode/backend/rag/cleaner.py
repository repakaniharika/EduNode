import re

def clean_text(text: str) -> str:
    """
    Cleans extracted PDF text while attempting to preserve educational meaning,
    paragraph boundaries, and math notation where possible.
    """
    if not text:
        return ""

    # Remove repeated blank lines (more than 2 to a single blank line)
    cleaned = re.sub(r'\n{3,}', '\n\n', text)
    
    # Remove excessive horizontal whitespace but keep structural spacing
    cleaned = re.sub(r'[ \t]{2,}', ' ', cleaned)
    
    # Strip leading/trailing whitespace from each line
    cleaned = "\n".join([line.strip() for line in cleaned.split("\n")])
    
    # Optional: Basic header/footer artifact removal (heuristic)
    # This is tricky without knowing the exact PDF structure, so we keep it light.
    # E.g. removing standalone page numbers
    cleaned = re.sub(r'^\d+$\n', '', cleaned, flags=re.MULTILINE)
    
    return cleaned.strip()
