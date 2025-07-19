import Card from "./Card.jsx";

export default function Home(){

    return (
        <>
            <Card categoria={"processor"} descrizione={"Selezionare un Processore"}></Card>
            <Card categoria={"motherboard"} descrizione={"Selezionare una Scheda Madre "}></Card>
            <Card categoria={"cpu-cooler"} descrizione={"Selezionare un Dissipatore"}></Card>
            <Card categoria={"case"} descrizione={"Selezionare un Case"}></Card>
            <Card categoria={"graphics-card"} descrizione={"Selezionare una Scheda Video"}></Card>
            <Card categoria={"ram"} descrizione={"Selezionare una Memoria RAM"}></Card>
            <Card categoria={"storage"} descrizione={"Selezionare la quantità di Memoria del Disco"}></Card>
            <Card categoria={"case-cooler"} descrizione={"Selezionare un set di Ventole"}></Card>
            <Card categoria={"power-supply"} descrizione={"Selezionare un Alimentatore"}></Card>
        </>
    )

}