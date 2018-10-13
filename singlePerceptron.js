this.Perceptron = function(){
    var network = this;
    this.bias = 1;
    this.weights = [];
    this.learnRate = 0.15;
    this.iteractions = 1000;

    this.sigmoid = function(x){
        return (1/(1-Math.exp(-1*x)));
    }

    this.init = function(learnRate, iteractions){
        network.learnRate = learnRate;
        network.iteractions = iteractions;
    }

    this.initWeights = function(num){
        bias = parseInt(Math.random()*10);

        for(var i = 0; i < num; i++){
            network.weights[i] = parseInt(Math.random()*10);
        }
    }

    this.train = function(data){
        network.initWeights(data[0].inputs.length);
        var iteraction = 0;
        var error = true;

        while(error && iteraction < network.iteractions){
            error = false;
            var difference = 0;

            for(var i = 0; i < data.length; i++){
                var result = network.run(data[i].inputs);
                    if(result != data[i].output){
                        error = true;
                        difference = data[i].output - result;
                        network.recalcWeights(difference, data[i].inputs);
                    }
                    else{
                        error = false;
                    }
            }

            console.log('Iteraction: '+iteraction+'  - Error: '+difference.toFixed(12));
            iteraction++;
        }
    }

    this.recalcWeights = function(val, inputs){
        for(var i = 0; i < network.weights; i++){
            network.weights[i] = network.weights[i] + network.learnRate * val * inputs[i];
        }
    }

    this.run = function(inputs){
        var sum = 0;

        for(var i = 0; i < inputs.length; i++){
            sum += inputs[i] * network.weights[i];
        }
        sum += network.bias;

        return network.sigmoid(sum);
    }
}