# Responsible AI & Privacy Notes

## Intended use

Signal Copilot helps candidates and recruiters organize communication evidence and prepare follow-up conversations. It is not designed to recommend hiring, rejection, compensation, performance, or employment eligibility decisions.

## Prohibited use

- Automated screening, ranking, rejection, or offer withdrawal.
- Inferring protected or sensitive traits.
- Evaluating personality, honesty, loyalty, cultural fit, or long-term performance.
- Uploading conversations without an appropriate legal basis and participant notice.
- Treating evidence coverage as a probability that someone will accept an offer or be hired.

## Current prototype safeguards

- Free-form text stays in the browser and is not persisted.
- Common contact details trigger a visible anonymization warning.
- Sample outputs and local-rule outputs have different provenance labels.
- Every detected signal includes the sentence used as evidence.
- No-evidence input produces an insufficient-evidence state.
- Follow-up guidance emphasizes clarification and continued communication.

## Limitations

The current personal-data detector is incomplete. The local rules do not understand nuanced context, sarcasm, conversation history, time zones, or organization-specific processes. The project has not undergone legal, security, fairness, or production privacy review.

## Requirements before any production pilot

1. Data protection impact assessment and jurisdiction-specific legal review.
2. Server-side secrets, encryption, retention controls, deletion, and access logging.
3. Automated redaction plus user confirmation before transmission.
4. A representative, consented evaluation set with Chinese and English cases.
5. Measurement of evidence attribution, refusal behavior, group fairness, and harmful recommendations.
6. Human override, incident reporting, monitoring, and a documented appeals path.
