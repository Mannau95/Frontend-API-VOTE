// components/CandidatureInfo.jsx
import { User, Mail, Phone, Linkedin, Link, FileText } from "lucide-react";
import Card from "../../Components/ui/Card.jsx";
import SectionTitle from "../../Components/ui/SectionTitle.jsx";
import {InfoRow} from "../../Components/ui/InfoRow.jsx";
import {FileItem} from "../../Components/ui/FileItem.jsx";

export function CandidatInfoCard({ candidat }) {
    return (
        <Card className="p-6">
            <SectionTitle>Informations du Candidat</SectionTitle>
            <InfoRow icon={User}     label="Nom Complet:"  value={candidat.name} />
            <InfoRow icon={Mail}     label="Email:"        value={candidat.email}     isLink />
            <InfoRow icon={Phone}    label="Téléphone:"    value={candidat.phone} />
            <InfoRow icon={Linkedin} label="LinkedIn:"     value={candidat.linkedin}  isLink />
            <InfoRow icon={Link}     label="Portfolio:"    value={candidat.portfolio} isLink />
            <InfoRow icon={FileText} label="CV:"           value={candidat.cv}        isLink />
        </Card>
    );
}

export function MotivationCard({ text }) {
    return (
        <Card className="p-6">
            <SectionTitle>Lettre de Motivation</SectionTitle>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{text}</p>
        </Card>
    );
}

export function DocumentsCard({ documents }) {
    return (
        <Card className="p-6">
            <SectionTitle>Documents Supplémentaires</SectionTitle>
            <div className="flex flex-col gap-0.5">
                {documents.map((doc, i) => (
                    <FileItem key={i} name={doc} />
                ))}
            </div>
        </Card>
    );
}