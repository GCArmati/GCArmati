import Card from "./Card.jsx";

export default function Home({userLogin}){

    return (
        <>
            <Card userLogin={userLogin} categoria={"processor"} descrizione={"Selezionare un Processore"}></Card>
            <Card userLogin={userLogin} categoria={"motherboard"} descrizione={"Selezionare una Scheda Madre "}></Card>
            <Card userLogin={userLogin} categoria={"cpu-cooler"} descrizione={"Selezionare un Dissipatore"}></Card>
            <Card userLogin={userLogin} categoria={"case"} descrizione={"Selezionare un Case"}></Card>
            <Card userLogin={userLogin} categoria={"graphics-card"} descrizione={"Selezionare una Scheda Video"}></Card>
            <Card userLogin={userLogin} categoria={"ram"} descrizione={"Selezionare una Memoria RAM"}></Card>
            <Card userLogin={userLogin} categoria={"storage"} descrizione={"Selezionare la quantità di Memoria del Disco"}></Card>
            <Card userLogin={userLogin} categoria={"case-cooler"} descrizione={"Selezionare un set di Ventole"}></Card>
            <Card userLogin={userLogin} categoria={"power-supply"} descrizione={"Selezionare un Alimentatore"}></Card>
        </>
    )

}