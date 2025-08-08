export default function generateData({ amountOfRecords }) {
   
    return [...Array(amountOfRecords)].map((_, index) => {
        return {
            Name: `Name (${index})`,
            Website: 'www.salesforce.com',
            Industry: 'Biotechnology',
            Phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
           
            
        };
    });
}