import './Dashboard.css'
import {useState, useEffect} from 'react'
import ComponentList from '../components/ComponentList.jsx'
import FormComponent from '../components/Form-Component.jsx'

const tabs = [
    { id: "create", label: "Create Product"},
    { id: "view", label: "Products"},
];

export default function Dashboard(){
    const [activeTab, setActiveTab] = useState("view");

    return (
        <div>
            <div>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {activeTab === "create" && <FormComponent />}
            {activeTab === "view" && <ComponentList />}
        </div>
    )
}