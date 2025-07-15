import './Dashboard.css'
import {useState} from 'react'
import ComponentList from './ComponentList.jsx'
import FormComponent from './FormComponent.jsx'
import {useNavigate} from 'react-router-dom';

const tabs = [
    { id: "create", label: "Create Component"},
    { id: "view", label: "Products"},
];

export default function Dashboard(){
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("view");

    return (
        <div>
            <div>
                {tabs.map((tab) => (
                    <button
                        style={{ color: "#b2f7ef" }}
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