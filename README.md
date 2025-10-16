# Bill Spliter with Google Gemini

This is a simple application to split bills between multiple people. Where few items could be assigned to specific people and other items can be marked as common.
The app can then calculate the split and show how much each person owes.

## Features

- Receipt scanning through [Google Gemini API](https://aistudio.google.com/)
- Intelligent Data Extraction since the AI prompt is written to handle
  - Multiple Languages
  - Various Decimal Systems
  - Automatic Currency Detection
  - Negative Values
- Users can **upload multiple** receipts at once
- Interactive Item Management with:
  - ability to update detected items name and price
  - ability to **add manual items**
  - ability to **delete items**
- Users can **add or remove** people who are part of the bill split.
- **Accurate cost calculation** and presents a **clear summary of how much each person owes**.
- API Key Validation
- Responsive Design

## Setup

```bash
git clone git@github.com:pinnheads/bill-split.git
cd bill-split
npm install
npm run dev
```

## ToDo's

- [x] Add the screen to add persons to split between
- [x] Add the screen to upload receipt image(s)
- [x] Add the screen to that shows each item as a list
- [x] Add the calculation logic
- [x] Add the Google Cloud API logic
- [ ] Add notification after scanning process starts
- [ ] Add safety checks and error handling
- [ ] Make it self-hostable

## Challenges and Learnings

### Initial OCR Inaccuracy

  - **Problem**: The initial attempts using basic parsing on OCR outputs was highly inaccurate as the receipts from different stores were in different formats, leading to incorrect item extraction.
  - **Learning**: A well-trained, context-aware AI-model which supports vision tooling is far superior to simple regex-based parsing. Crafting a good prompt to instruct it on language, currency and **JSON format output** helped me delegate the complex parsing logic to the AI. This dramatically **improved accuracy**. 

### React State Management and Component Structure

  - **Problem**: In the earlier stages, all logic was in a single file making it hard to manage. A bug where old items persisted after a new upload highlighted this issue.
  - **Learning**: Breaking the UI down into smaller, single-responsibility components makes the code cleaner and easier to debug. 

