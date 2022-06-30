<template>
    <div class="page-container container-fluid" style="max-width: 100%; width: 100%;">
        <main class="main-content">
            <div id="invoice-app" class="text-center border">
                <div class="header">
                    <table class="table" width="100%" style="margin: 0;">
                        <tr>
                            <td style="border: none;">
                                <table class="table" style="margin: 0; border: none;">
                                    <tr>
                                        <td style="border: none;" width="50%" align="left">
                                            <img height="150" width="200" src="src/assets/image.jpg">
                                        </td>
                                        <td style="text-align: right; border: none;">
                                            <span style="font-size: 52px;">Invoice</span><br>
                                            <input style="width: 30%; float: right;" type="text" class="form-control" name="">
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: none;">
                                <table class="table" style="margin: 0; border: none;">
                                    <tr>
                                        <td style="border: none;" width="60%">
                                            <table class="table" style="margin: 0; border: none;">
                                                <tr>
                                                    <td style="border: none;">
                                                        <textarea class="form-control" cols="30" rows="3"></textarea>
                                                    </td>
                                                </tr>
                                                <tr style="color: gray;">
                                                    <td style="border: none;" align="left">
                                                        <span>Bill To </span><br>
                                                        <span>
                                                            <textarea class="form-control" cols="30" rows="3"></textarea>
                                                        </span>
                                                    </td>
                                                    <td style="border: none;" align="left">
                                                        <span>Ship To </span><br>
                                                        <span>
                                                            <textarea class="form-control" cols="30" rows="3"></textarea>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td style="border: none;">
                                            <table class="table" style="margin: 0; border: none;">
                                                <tr>
                                                    <td style="border: none; color: gray;" align="right">
                                                        <span style="padding-right: 15px;">Date</span>
                                                        <span style="float: right;">
                                                            <input type="date" class="form-control" name="">
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="border: none; color: gray;" align="right">
                                                        <span style="padding-right: 15px;">Payment Terms</span>
                                                        <span style="float: right; width: 41%">
                                                            <input type="text" class="form-control" name="">
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="border: none; color: gray;" align="right">
                                                        <span style="padding-right: 15px;">Due Date</span>
                                                        <span style="float: right; width: 41%">
                                                            <input type="text" class="form-control" name="">
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="border: none; color: gray;" align="right">
                                                        <span style="padding-right: 15px;">PO Number</span>
                                                        <span style="float: right;  width: 41%">
                                                            <input type="text" class="form-control" name="">
                                                        </span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: none;">
                                <table class="table" style="margin: 0; border: none;">
                                    <thead>
                                        <tr style="background-color: #232d38; color: white;">
                                            <th width="40%" style="border: none; padding-left: 15px;">Item</th>
                                            <th width="12%" style="border: none;">Quantity</th>
                                            <th width="23%" style="border: none;">Rate</th>
                                            <th width="17%" style="border: none; text-align: right; padding-right: 15px;">Amount</th>
                                            <th width="8%"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in items" :key="item.description">
                                            <td style="border: none;">
                                                <input type="text" class="form-control" v-model="item.description">
                                            </td>
                                            <td style="border: none;">
                                                <input type="number" class="form-control" v-model="item.quantity">
                                            </td>
                                            <td style="border: none;">
                                                <span>US$</span>
                                                <input style="float: right; width: 75%;"  type="number" class="form-control" v-model="item.price">
                                            </td>
                                            <td style="border: none;">
                                                {{ decimalDigits(item.price * item.quantity) }}
                                            </td>
                                            <td style="border: none;">
                                                <button class="btn btn-danger" v-on:click="deleteItem(index)">Delete</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="border: none;" align="left">
                                                <button class="btn btn-success" v-on:click="addNewItem">Add New Item</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: none;">
                                <table class="table" style="margin: 0; border: none;">
                                    <tr>
                                        <td style="border: none; color: gray;" width="50%" align="left">
                                            <span>Notes</span><br>
                                            <span>
                                                <textarea class="form-control" rows="4"></textarea>
                                            </span>
                                        </td>
                                        <td style="border: none;" align="right">
                                            <table width="70%">
                                                <tr>
                                                    <td align="left" style="color: gray; width: 40%; border: none;">Sub Total</td>
                                                    <td align="right" style="border: none;">{{ decimalDigits(subTotal) }}</td>
                                                </tr>
                                                <tr>
                                                    <td align="left" style="color: gray; width: 40%; border: none;">Tax</td>
                                                    <td align="right" style="border: none;">
                                                        <input style="float: left; width: 92%" type="number" class="form-control" v-model="taxRate">
                                                        <span>%</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: none;">
                                <table class="table" style="margin: 0; border: none;">
                                    <tr>
                                        <td style="border: none; color: gray;" width="50%" align="left">
                                            <span>Terms</span><br>
                                            <span>
                                                <textarea class="form-control" rows="4"></textarea>
                                            </span>
                                        </td>
                                        <td style="border: none;" align="right">
                                            <table width="70%">
                                                <tr>
                                                    <td align="left" style="color: gray; width: 40%; border: none;">Total</td>
                                                    <td align="right" style="border: none;">{{ decimalDigits(grandTotal) }}</td>
                                                </tr>
                                                <tr>
                                                    <td align="left" style="color: gray; width: 40%; border: none;">Amount Paid</td>
                                                    <td align="right" style="border: none;">
                                                        <input type="number" class="form-control" name="" v-model="amountPaid">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" style="color: gray; width: 40%; border: none;">Balance Due</td>
                                                    <td align="right" style="border: none;">
                                                        {{ decimalDigits(grandTotal - amountPaid) }}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
                <button class="btn btn-primary" v-on:click="printInvoice">Save Invoice</button>
            </div>
        </main>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                invoiceCurrency: {
                    "symbol": "US$",
                    "name": "US Dollar",
                    "symbol_native": "$",
                    "decimal_digits": 2,
                    "rounding": 0,
                    "code": "USD",
                    "name_plural": "US dollars"
                },
                taxRate: 0,
                discountRate: 0,
                amountPaid: 0,
                items: [
                    { description: 'Item name', quantity: 0, price: 0 },
                    { description: 'Item name', quantity: 0, price: 0 },

                ],
                currencies: [
                    {"symbol":"$","name":"US Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"USD","name_plural":"US dollars"},
                    {"symbol":"CA$","name":"Canadian Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"CAD","name_plural":"Canadian dollars"}
                ],
                company: {
                    name: 'Your company name',
                    contact: 'Your address\nYour tel\nYour email'
                },
                client: 'Client information',
                invoiceDate: ''
            }
        },
        methods: {
            addNewItem: function() {
                this.items.push(
                    { description: 'Item name', quantity: 0, price: 0 }
                )
            },
            deleteItem: function(index) {
                this.items.splice(index, 1)
            },
            decimalDigits: function(value) {
                return this.invoiceCurrency.symbol + ' ' + value.toFixed(this.invoiceCurrency.decimal_digits);
            },
            printInvoice: function() {
                console.log(this.items);
            },
            adjustTextAreaHeight: function(event){
                var el = event.target;
                el.style.height = "1px";
                el.style.height = (25+el.scrollHeight)+"px";
            }
        },
        computed: {
            subTotal: function() {
                var total = this.items.reduce(function(accumulator, item) {
                    return accumulator + (item.price * item.quantity);
                }, 0)
                return total;
            },
            discountTotal: function() {
                var total = this.subTotal * (this.discountRate / 100);
                return total;
            },
            taxTotal: function() {
                var total = (this.subTotal - this.discountTotal) * (this.taxRate / 100);
                return total;
            },
            grandTotal: function() {
                var total = (this.subTotal - this.discountTotal) + this.taxTotal;
                return total;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
    .page-container {
        max-width: 1600px;
        width: 1600px;
    }

    .main-content {
        max-width: 1600px;
        width: 1600px;
        min-height: 100vh;
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        @media print {
            align-items: flex-start;
        }
    }

    .text-right {
        text-align: right;
    }

    button {
        cursor: pointer
    }
</style>
