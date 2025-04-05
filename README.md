# Frontend Setup Guide

Follow these steps to run the project on your local machine:

---

### 1. Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

---

### 2. Replace Production URL with Localhost

Go through all the files where Axios is used, and replace the production base URL with your local backend URL.

For example:

Replace:
```js
axios.get("https://your-production-url.com/api/getTasks")
```

With:
```js
axios.get("http://localhost:3000/api/getTasks")
```


### 3. Start the Development Server

Run the following command to start the project locally:

```bash
npm run dev
```

The app will typically be accessible at:

```
http://localhost:5173
```
### 4. To Sign Out from application (Frontend)
---

###

1. **Clear the JWT token from `localStorage`**
2. **Reload the page gives you not found message**
3. **Redirect to the login (sign-in) page using (/) route**

---

You're now ready to use the frontend locally! 
