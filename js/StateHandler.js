
//a utility for ensuring that only one given state is active at a time
class StateHandler
{
    //an array of states is provided 
    constructor(states)
    {
        this.states = {};

        //for each state provided, add it to our object of states and set them all as inactive
        for(let state of states)
        {
            this.states[state] = false;
        }

        //set the first state provided as the default active state
        this.states[states[0]] = true;
    }

    //set the current state to the state name provided
    setTo(state)
    {
        if(this.states.hasOwnProperty(state) == false) //disallow adding new states
            return

        //ensure that the state is properly switched by deactivating all states first
        for(let key in this.states)
        {
            this.states[key] = false;
        }

        this.states[state] = true;
    }

    //return the current active state's name
    getCurrentState()
    {
        for(let key in this.states)
        {
            if(this.states[key] == true)
            {
                return key;
            }
        }
    }
}