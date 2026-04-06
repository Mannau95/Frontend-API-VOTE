// components/CandidatureSidebar.jsx
import { Calendar, Briefcase, Building2, FileSignature, GraduationCap, MapPin } from "lucide-react";
import Card from "../../Components/ui/Card.jsx";
import SectionTitle from "../../Components/ui/SectionTitle.jsx";
import {PosteRow} from "../../Components/ui/InfoRow.jsx";

const STATUS_VARIANT = {
    "Interview planifiée": "interview",
    "En attente":          "warning",
    "Accepté":             "success",
    "Refusé":              "default",
};

export function StatutCard({ statut, dateSubmission, dateMaj, notes }) {
    return (
        <Card className="p-5 flex flex-col gap-4">
            <SectionTitle>Statut de la Candidature</SectionTitle>

            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Statut Actuel:</span>
                <Badge variant={STATUS_VARIANT[statut] ?? "default"}>{statut}</Badge>
            </div>

            <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 text-gray-500">
          <Calendar size={13} /> Date de Soumission:
        </span>
                <span className="font-medium text-gray-800">{dateSubmission}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 text-gray-500">
          <Calendar size={13} /> Dernière Mise à Jour:
        </span>
                <span className="font-medium text-gray-800">{dateMaj}</span>
            </div>

            <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Notes Internes</p>
                <textarea
                    defaultValue={notes}
                    rows={5}
                    className="w-full text-sm text-gray-600 leading-relaxed border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
            </div>
        </Card>
    );
}

export function PosteCard({ poste }) {
    return (
        <Card className="p-5">
            <SectionTitle>Détails du Poste</SectionTitle>
            <PosteRow icon={Briefcase}      label="Poste Visé:"       value={poste.titre} />
            <PosteRow icon={Building2}      label="Département:"      value={poste.departement} />
            <PosteRow icon={FileSignature}  label="Type de Contrat:"  value={poste.contrat} />
            <PosteRow icon={GraduationCap}  label="Programme:"        value={poste.programme} />
            <PosteRow icon={MapPin}         label="Localisation:"     value={poste.localisation} />
        </Card>
    );
}