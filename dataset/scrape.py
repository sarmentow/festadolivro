import requests
import csv

def get_api_data(url):
    """Get API data from the given URL."""
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to retrieve data from {url}. Status code: {response.status_code}")
        return None

def save_to_csv(filename, data):
    """Save the API data to a CSV file."""
    with open(filename, 'a', newline='') as csvfile:
        fieldnames = data[0].keys()
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        # Write header if file is new
        if csvfile.tell() == 0:
            writer.writeheader()

        writer.writerows(data)

def main():
    base_url = "https://festadolivro.edusp.com.br/api/v1/event-books?flag=26-festa-do-livro-da-usp&column=name&order=asc&per_page=100"
    filename = "event_books.csv"
    max_page = 297

    for page in range(1, max_page + 1):
        url = f"{base_url}&page={page}"
        data = get_api_data(url)
        if data and 'data' in data:
            save_to_csv(filename, data['data'])
        else:
            print(f"Failed to retrieve data from page {page}.")
            break

if __name__ == "__main__":
    main()