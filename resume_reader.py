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




print(read_docx('Resume_of_Thomas_Tunquist.docx'))












# document= Document('Resume_of_Thomas_Tunquist.docx')


# for para in document.paragraphs:
#     print(para.text)

# for table in document.tables:
#     for row in table.rows:
#         for cell in row.cells:
#             print(cell.text)
