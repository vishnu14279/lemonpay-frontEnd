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

---

You're now ready to use the frontend locally! 
