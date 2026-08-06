import Card from "../../Components/ui/Card.jsx";
import SectionTitle, {RuleItem} from "../../Components/ui/SectionTitle.jsx";


export function ElectionOverview({ election }) {
    return (
        <Card className="p-6">
            <SectionTitle>Aperçu</SectionTitle>
            <p className="text-sm font-semibold text-gray-900 mb-2">
                Nom de l'Élection : {election.name}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{election.description}</p>
        </Card>
    );
}

export function VotingRules({ rules }) {
    return (
        <Card className="p-6">
            <SectionTitle>Règles de Vote</SectionTitle>
            <ul>
                {rules.map((rule, i) => (
                    <RuleItem key={i}>{rule}</RuleItem>
                ))}
            </ul>
        </Card>
    );
}