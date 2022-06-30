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
                                            <input style="width: 30%; float: right;" type="text" class="form-control" v-model="invoice.invoice_number">
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
                                                        <textarea class="form-control" cols="30" rows="3" v-model="invoice.invoice_from_text"></textarea>
                                                    </td>
                                                </tr>
                                                <tr style="color: gray;">
                                                    <td style="border: none;" align="left">
                                                        <span>Bill To </span><br>
                                                        <span>
                                                            <textarea class="form-control" cols="30" rows="3" v-model="invoice.bill_to"></textarea>
                                                        </span>
                                                    </td>
                                                    <td style="border: none;" align="left">
                                                        <span>Ship To </span><br>
                                                        <span>
                                                            <textarea class="form-control" cols="30" rows="3" v-model="invoice.ship_to"></textarea>
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
                                                            <input type="date" class="form-control" v-model="invoice.invoice_date">
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="border: none; color: gray;" align="right">
                                                        <span style="padding-right: 15px;">Payment Terms</span>
                                                        <span style="float: right; width: 41%">
                                                            <input type="text" class="form-control" v-model="invoice.invoice_terms">
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="border: none; color: gray;" align="right">
                                                        <span style="padding-right: 15px;">Due Date</span>
                                                        <span style="float: right; width: 41%">
                                                            <input type="text" class="form-control" v-model="invoice.due_date">
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="border: none; color: gray;" align="right">
                                                        <span style="padding-right: 15px;">PO Number</span>
                                                        <span style="float: right;  width: 41%">
                                                            <input type="text" class="form-control" v-model="invoice.po_number">
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
                                        <tr v-for="(item, index) in invoice.items" :key="item.description">
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
                                                        <input style="float: left; width: 92%" type="number" class="form-control" v-model="invoice.tax_percent">
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
                                                        <input type="number" class="form-control" v-model="invoice.amount_paid">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" style="color: gray; width: 40%; border: none;">Balance Due</td>
                                                    <td align="right" style="border: none;">
                                                        {{ decimalDigits(invoice.grandTotal - invoice.amount_paid) }}
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
                <button class="btn btn-primary" v-on:click="saveInvoice">Save Invoice</button>
            </div>
        </main>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                invoice: {
                    invoice_number: "",
                    invoice_date: "",
                    invoice_terms: "",
                    due_date: "",
                    po_number: "",
                    invoice_from_text: "",
                    bill_to: "",
                    ship_to: "",
                    items: [
                        { description: 'Item name', quantity: 0, price: 0 },
                        { description: 'Item name', quantity: 0, price: 0 },
                    ],
                    invoiceCurrency: {
                        "symbol": "US$",
                        "decimal_digits": 2,
                    },
                    tax_percent: 0,
                    discountRate: 0,
                    amount_paid: 0,
                    notes: "",
                    terms_and_conditions: ""
                }
            }
        },
        methods: {
            addNewItem: function() {
                this.invoice.items.push(
                    { description: 'Item name', quantity: 0, price: 0 }
                )
            },
            deleteItem: function(index) {
                this.invoice.items.splice(index, 1)
            },
            decimalDigits: function(value) {
                return this.invoice.invoiceCurrency.symbol + ' ' + value.toFixed(this.invoice.invoiceCurrency.decimal_digits);
            },
            saveInvoice: function() {
                console.log(this.invoice);
            },
            adjustTextAreaHeight: function(event){
                var el = event.target;
                el.style.height = "1px";
                el.style.height = (25+el.scrollHeight)+"px";
            }
        },
        computed: {
            subTotal: function() {
                var total = this.invoice.items.reduce(function(accumulator, item) {
                    return accumulator + (item.price * item.quantity);
                }, 0)
                return total;
            },
            discountTotal: function() {
                var total = this.subTotal * (this.invoice.discountRate / 100);
                return total;
            },
            taxTotal: function() {
                var total = (this.subTotal - this.discountTotal) * (this.invoice.tax_percent / 100);
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
