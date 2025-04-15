# 🏢 CompanyInfo App

A React-based web application that allows users to add companies, browse company listings, submit reviews, and view user-generated feedback with ratings.

---

## 🚀 Features

### 1. 📝 Add Company
- Navigate to the "Add Company" section.
- Fill out required fields:
  - Company Name
  - Location
  - Founded On (date)
  - City
- Verify all details and submit the form to create a new company profile.

---

### 2. 📄 Company Listing
- Newly added companies appear in the main company list.
- Each company displays:
  - Name
  - Logo
  - Description
- Users can:
  - Search companies by name or keywords
  - Filter the list based on city or other criteria

---

### 3. ✍️ Add Review
- Click on a company to view its detailed profile.
- Scroll to the **Reviews** section.
- Click on **"Add Review"** to submit feedback.
- Provide:
  - Full Name
  - Subject
  - Review Text
  - Star Rating (0.5 to 5)
- Submit the review to post it under the company.

---

### 4. 💬 Review Listing
- Submitted reviews are displayed under the respective company.
- Each review shows:
  - Reviewer Name
  - Subject
  - Review Content
  - Rating
- Sorting options available:
  - By Relevance
  - By Date
  - By Rating
- Displays the average rating of all reviews at the top.
- Users can interact with reviews (like or share).

---

## 🛠️ Tech Stack

- **Frontend:** React, Material UI (MUI)
- **Backend:** Node.js, Express.js
- **Validation:** express-validator
- **Styling:** Styled Components + MUI Theme

---

## 🧪 Getting Started

### Clone the Repository

```bash
git clone https://github.com/Aditya-Patidarr/CompanyInfo.git
cd CompanyInfo
