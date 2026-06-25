# Founder Scout

A minimal Chrome/Edge Manifest V3 extension that analyzes the active startup website in a browser side panel.

## What it extracts

- Company name
- Founding year or date when publicly stated
- A short description of what the company does
- Current founders found in structured data or public page text
- Founder emails inferred as `firstname@company-domain`
- Source pages used during extraction

Inferred emails are guesses. The extension does not verify mailbox ownership or deliverability.

## Install locally

1. Open `chrome://extensions` in Chrome or `edge://extensions` in Edge.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select the `founder-scout-extension` directory.
5. Open a startup website and click the Founder Scout toolbar action.
6. Click **Extract** in the side panel.

## Enable Gemini Google Search

The extension works locally without Gemini, but automatic web research requires the local backend.

1. Create a Gemini API key in Google AI Studio.
2. From the workspace root, run:

   ```bash
   GEMINI_API_KEY="your-key" npm run founder-scout:server
   ```

3. Keep that terminal running while using the extension.

The backend calls Gemini with Google Search grounding. The API key stays in the local server environment and is not stored in the extension.

## Limits

- Browser-protected pages such as the Chrome Web Store cannot be analyzed.
- JavaScript-rendered text is read from the active page, but linked pages are fetched as HTML and may omit content rendered only after scripts run.
- Founder status is based on public page evidence. It may be incomplete or stale.
- The extension does not use search engines, LinkedIn, paid data sources, or email-verification services.
