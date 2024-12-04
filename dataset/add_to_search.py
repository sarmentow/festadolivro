import csv
import json
from meilisearch import Client

MEILISEARCH_URL = "http://localhost:7700"
client = Client(MEILISEARCH_URL, 'aSampleMasterKey')
index_name = "books"
index = client.index(index_name)
csv_file_path = "books.csv"

# Read the CSV file and add documents to MeiliSearch
with open(csv_file_path, 'r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    documents = []
    for idx, row in enumerate(reader):
        row['id'] = idx
        documents.append(row)

    
    # Add the documents to MeiliSearch
    index.add_documents(documents)

print("Documents added to MeiliSearch")
