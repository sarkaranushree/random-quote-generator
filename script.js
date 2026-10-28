
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const statusElement = document.getElementById("status");
const newQuoteButton = document.getElementById("new-quote");

async function getNewQuote() {
    newQuoteButton.disabled = true;
    newQuoteButton.textContent = "Loading...";
    statusElement.textContent = "";
    quoteElement.textContent = "Fetching a new quote...";
    authorElement.textContent = "";

    try {
        const response = await fetch("https://dumbapis.com/quote");

        if (!response.ok) {
            throw new Error("The quote service is unavailable.");
        }

        const data = await response.json();

        if (
            typeof data.quote !== "string" ||
            !data.quote.trim() ||
            typeof data.author !== "string" ||
            !data.author.trim()
        ) {
            throw new Error("The API returned invalid quote data.");
        }

        quoteElement.textContent = data.quote;
        authorElement.textContent = "— " + data.author;
    } catch (error) {
        quoteElement.textContent = "We couldn't load a quote right now.";
        authorElement.textContent = "";
        statusElement.textContent =
            "Please check your internet connection and try again.";
        console.error("Quote loading error:", error);
    } finally {
        newQuoteButton.disabled = false;
        newQuoteButton.textContent = "New Quote ↗";
    }
}

newQuoteButton.addEventListener("click", getNewQuote);

getNewQuote();
