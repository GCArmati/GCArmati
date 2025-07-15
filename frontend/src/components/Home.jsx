import Card from "./Card.jsx";
import './Home.css'

export default function Home(){

    return (
        <>
            <Card categoria={"processor"} descrizione={"Selezionare il processore "}></Card>
            <Card categoria={"motherboard"} descrizione={"Selezionare la scheda madre "}></Card>
            <Card categoria={"cpu-cooler"} descrizione={"Selezionare un dissipatore"}></Card>
            <Card categoria={"case"} descrizione={"Selezionare case"}></Card>
            <Card categoria={"graphics-card"} descrizione={"Selezionare scheda video"}></Card>
            <Card categoria={"ram"} descrizione={"Selezionare la memoria RAM"}></Card>
            <Card categoria={"storage"} descrizionee={"Selezionare la quantità di Memoria del Disco"}></Card>
            <Card categoria={"case-cooler"} descrizione={"Selezionare il set di ventole"}></Card>
            <Card categoria={"power-supply"} descrizione={"Selezionare un alimentatore"}></Card>
        </>
    )

}