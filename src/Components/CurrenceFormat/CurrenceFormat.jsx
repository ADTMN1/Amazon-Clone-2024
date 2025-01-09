
import numeral from 'numeral'

const CurrenceFormat = ({ amount }) => {
    const formmatedAmount = numeral(amount).format("$0,0.00")
    return <div>{formmatedAmount}</div>
}
export default CurrenceFormat;