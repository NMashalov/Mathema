from PyPDF2 import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_openai import OpenAIEmbeddings

from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAI
from langchain.chains.question_answering import load_qa_chain
from langchain_community.callbacks import get_openai_callback
from celery import shared_task

@shared_task
def send_email(user_pk):
    car.photo.open()
    user = User.objects.get(pk=user_pk)

    pdf_reader = PdfReader(pdf)
        
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
        
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000, # it will divide the text into 800 chunk size each (800 tokens)
        chunk_overlap=200,
    )
    chunks = text_splitter.split_text(text=text)
    
    
    # st.write(chunks[1])
    

    knowledge_base  = FAISS.from_texts(chunks, embeddings)