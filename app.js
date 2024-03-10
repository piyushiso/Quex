const express = require('express')

const {google} = require('googleapis')

const app = express()

app.get("/", async (req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })

    // Client instance for auth.
    const client = await auth.getClient()

    // Instance of Google Sheets API.
    const sheet = google.sheets({
        version: 'v4',
        auth: client
    })

    const spreadsheetId = '14b1RqFugFDFxBn2xZQjt3dF6Nv-4oE9BhKARgUUcoUk'

    // Get metadata
    const metaData = await sheet.spreadsheets.get({
        auth,
        spreadsheetId
    })

    // Read rows.

    const getRows = await sheet.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'Questions!B:H'
    })

    res.send(getRows.data.values)
})

app.listen(1337, (req, res) => console.log("Reading on port: 1337"))