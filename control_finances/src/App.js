import React, {useState, useEffect} from "react";
import Form from "./Components/Form";
import Header from "./Components/Header";
import Resume from "./Components/Resume";
import GlobalStyle from "./styles/global"


const App = () =>{
    const data = localStorage.getItem("transactions");
    const [transactionsList, setTransactionsList] = useState(
        data ? JSON.parse(data) : []
    );
    const [Income, setIncome] = useState(0);
    const [extense, setExpense] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect (() => {
        const amountExpense = transactionsList
        .filter((item) => item.expense)
        .map((transaction) => Number(transaction.amount));

        const amountIncome = transactionsList
        .filter((item) => !item.expense)
        .map((transaction) => Number(transaction.amount));

        const expense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);
        const Income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);

        const total = Math.abs(Income - expense).toFixed(2);

        setIncome(`R$ ${Income}`);
        setExpense(`R$ ${expense}`);
        setTotal(`${Number(Income) < Number(expense) ? "-" : ""}R$ ${total}`);


    }, [transactionsList]); 

    const handleAdd = (transaction) => {
        const newArrayTransactions = [...transactionsList, transaction];

        setTransactionsList(newArrayTransactions);
        
        localStorage.setItem("transaction", JSON.stringify(newArrayTransactions));
    };

    return(
        <>       
         <Header/>
         <Resume income={Income} expense={extense} total={total}/>
         <Form handleAdd={handleAdd} transactionsList={transactionsList} setTransactionsList={setTransactionsList}/>
         <GlobalStyle/>
        </>

    );
}

export default App;