export const filters=[
    {
        id:'color',
        name:'Color',
        options: [
            { value: "White", label: "White" },
            { value: "Black", label: "Black" },
            { value: "Blue", label: "Blue" },
            { value: "Navy Blue", label: "Navy Blue" },
            { value: "Royal Blue", label: "Royal Blue" },
            { value: "Yellow", label: "Yellow" }
        ],
    },
    {
        id:'category',
        name:'Category',
        options: [
            { value: "T-shirts", label: "Mens Tshirts" },
            { value: "Iphone", label: "iPhones" },
            { value: "Samsung-Smart-Phones", label: "Samsung Mobiles" },
        ],
    }
];
export const singleFilter=[
    {
        id: 'price',
        name: 'Price',
        options:[
            { value : "0-500", label : "₹0-₹500" },
            { value : "500-1000", label : "₹500-₹1000" },
            { value : "1000-2000", label : "₹1000-₹2000" },
            { value : "2000-4000", label : "₹2000-₹4000" },
            { value : "4000-10000", label : "₹4000-₹10000" },
            { value : "10000-1000000", label : "₹10000 +" }
        ]
    }
];

export const sortOptions = [
    { name: "Price: Low to High", value: "price_low", current: false },
    { name: "Price: High to Low", value: "price_high", current: false }
   ];
   
