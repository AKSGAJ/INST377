const express = require('express')
const supabaseClient = require('@supabase/supabase-js')
const bodyParser = require('body-parser')
const {isValidStateAbbreviation} = require("usa-state-validator")

const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

const supabaseUrl = 'https://wtcgkuheweptkikmxpzs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0Y2drdWhld2VwdGtpa214cHpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MzA2NjQsImV4cCI6MjA0ODMwNjY2NH0.MEr4B2mkChitY-4W5YkEgQZ7YLFPQ0Phkn-FcsWaAog'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);


app.get('/customers', async (req, res) => {
    console.log('Attempting to get all customers.')

    const { data, error } = await supabase
  .from('customer')
  .select()

    if(error){
        console.log('Error:', error)
        res.send(error);
    } else {
        console.log('Data retrieved')
        res.send(data);
    }

})

app.post('/customer', async (req, res) => {
    console.log('Adding customer...')
    console.log('Request', req.body)

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userState = req.body.userState;

    if(!isValidStateAbbreviation(userState)){
        console.error(`State ${userState} is invalid`);
        res.statusCode = 400;
        res.header('Content-Type', 'application/json')
        const stateInvalidErrorJson = {
            'message': `${userState} is not a valid State Abbreviation`,
        };
        res.send(JSON.stringify(stateInvalidErrorJson));
        return;
    }

    const { data, error } = await supabase
  .from('customer')
  .insert({customer_first_name: firstName, customer_last_name: lastName, customer_state: userState})
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