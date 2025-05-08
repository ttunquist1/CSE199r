from docx import Document

def read_docx(file_path):
    """
    Reads a .docx file and returns its content as a string.
    """
    document = Document(file_path)
    full_text = []
    for para in document.paragraphs:
        full_text.append(para.text)
    for table in document.tables:
        for row in table.rows:
            for cell in row.cells:
                full_text.append(cell.text)

    return '\n'.join(full_text)


def get_file():
    """
    Prompts the user to select a .docx file from file explorer and returns its path.
    """
    import tkinter as tk
    from tkinter import filedialog

    root = tk.Tk()
    root.withdraw()  # Hide the root window

    file_path = filedialog.askopenfilename(
        title="Select a .docx file",
        filetypes=[("Word files", "*.docx")]
    )

    return file_path if file_path else None
