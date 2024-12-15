const express = require('express')
const supabaseClient = require('@supabase/supabase-js')
const bodyParser = require('body-parser')


const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

const supabaseUrl = 'https://jlxfnrgviemtjfboysub.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpseGZucmd2aWVtdGpmYm95c3ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyMjMzNDcsImV4cCI6MjA0OTc5OTM0N30.hd8LDeEkurDLy-0O-3MqrK5MwZwW6OJ3fLSOvOAWOE8'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);


app.get('/coordinates', async (req, res) => {
    console.log('Attempting to get all locations.')

    const { data, error } = await supabase
  .from('coords')
  .select()

    if(error){
        console.log('Error:', error)
        res.send(error);
    } else {
        console.log('Data retrieved')
        res.send(data);
    }

})

app.post('/coords', async (req, res) => {
    console.log('Adding location...')
    console.log('Request', req.body)

    const locality = req.body.local
    const latitude = req.body.lat;
    const longitude = req.body.long;

    const { data, error } = await supabase
  .from('coords')
  .insert({locality: local, latitude: lat, longitude: long})
  .select();

  if(error){
    console.log('Error:', error)
    res.send(error);
} else {
    console.log('Data retrieved')
    res.send(data);
}
})

app.listen(port, () => {
    console.log('App is active')
})