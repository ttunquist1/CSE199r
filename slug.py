import re
import unicodedata

def slugify(text: str) -> str:
    """
    Converts a string into a URL-friendly slug.
    
    - Converts to lowercase
    - Removes non-ASCII characters
    - Replaces spaces and underscores with hyphens
    - Removes special characters
    - Collapses multiple hyphens into one
    """
    # Normalize unicode characters to closest ASCII representation
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('ascii')
    # Lowercase the string
    text = text.lower()
    # Replace spaces and underscores with hyphens
    text = re.sub(r'[\s_]+', '-', text)
    # Remove all non-alphanumeric and non-hyphen characters
    text = re.sub(r'[^a-z0-9-]', '', text)
    # Collapse multiple hyphens
    text = re.sub(r'-+', '-', text)
    # Strip leading/trailing hyphens
    return text.strip('-')


print(slugify("My Awesome Blog Post!"))  # Output: my-awesome-blog-post
print(slugify("Café & Croissants: A Morning Ritual"))  # Output: cafe-croissants-a-morning-ritual
