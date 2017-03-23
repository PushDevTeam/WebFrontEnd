
export class MainData {
    
    private _client: any;
    private _azurepath: string = 'https://pushdaily-00.azurewebsites.net';

    constructor(){

    }

    connectAzure = (azure: any) => {
        this._client = new azure(this._azurepath);
    }

    queryData = (table) => {
        /**
         * Process the results that are received by a call to table.read()
         *
         * @param {Object} results the results as a pseudo-array
         * @param {int} results.length the length of the results array
         * @param {Object} results[] the individual results
         */
        
            function success(results) {
                //var numItemsRead = results.length;

                for (var i = 0 ; i < results.length ; i++) {
                    var row = results[i];
                    console.log('row', row)
                    // Each row is an object - the properties are the columns
                }
            }

            function failure(error) {
                throw new Error('Error loading data: ');
            }

            table
                .read()
                .then(success, failure);
                }

    get client(){ return this._client };
    get azurepath() {return this._azurepath};
}
