function checkUserTypedQrWord(msg) {
  /* Changing words into upper case, removing multiple spaces and split by " " to check the values */
  const filterKeyword = msg.toUpperCase().replace(/\s+/g, " ").split(" ");

  /* Validating word qr and of */
  const checkQrOfValidation = ["QR", "OF"].every((value) => {
    return filterKeyword.includes(value);
  });
  if (!checkQrOfValidation) return null;
  return filterKeyword;
}

/* Taking out words after of */
function findKeywordToMakeQrCodeAfterWordOf(msg) {
  /* Removing all the spaces if user type multiple spaces */
  const removeSpaceMsg = msg.replace(/\s+/g, " ");

  /* Changing words into upper case to check the index value */
  const msgConvertedToUpperCase = removeSpaceMsg.toUpperCase();

  /* Splitting words and making array */
  const msgValues = msgConvertedToUpperCase.split(" ");

  /* Splitting real values and making array */
  const userValues = removeSpaceMsg.split(" ");

  const indexOf = msgValues.indexOf("OF");

  const result = userValues.slice(indexOf + 1).join(" ");
  console.log("qr result:", result);
  return result;
}

module.exports = {
  checkUserTypedQrWord,
  findKeywordToMakeQrCodeAfterWordOf,
};
