from src.llm_agents.scrapers.playwright_sync import get_paragraphs
from src.llm_agents.sources.wikipedia import WikipediaSource
from src.llm_agents.extractors.cohere_places_extractor import coherePlacesExtractor
from src.neo4j_db.neo4j_connection import Neo4jConnection
from src.llm_agents.classifiers.classify_definition import classify_definition
from src.llm_agents.utils import keep_arabic
from src.neo4j_db.neo4j_connection import get_neo4j_connection


def generate_places(worker_id="",
                         domain="",
                         sources=[{
                             "type": "",
                             "content": ""
                         }],
                         task='places',
                         words=[]
                         
                         ):
    for source in sources:
        print(source["type"])
        if source["type"] == "Url":
            input_paragraphs = get_paragraphs(source["content"])
        elif source["type"] == "Wikipedia":
            wiki = WikipediaSource(domain=domain, n_docs=1)
            input_paragraphs = wiki.get_content()
        elif source["type"] == "File":
            input_paragraphs = source["content"]

        extractor = coherePlacesExtractor()

        conn = get_neo4j_connection()
        print('Scraping...')
        for paragraph in input_paragraphs:
            print("\nPARAGRAPH", paragraph)
            paragraph = paragraph.replace('\'', '')
            paragraph = paragraph.replace('\"', '')
            print("REPLACED", paragraph)
            extracted_text = extractor.extract(paragraph)
            for word in extracted_text:
                if word not in ["", "لا شيء"]:
                    word = keep_arabic(word)
                    conn.add_word(worker_id, word, domain, task)
                    print(word)

        conn.close()
    return "OK"
