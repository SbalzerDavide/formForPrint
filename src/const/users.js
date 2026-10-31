export const Users = [
  {
    name: "Giorgia",
    surname: "Mazzoni",
    gender: "F",
    signature: "",
    email: "",
    id: "",
    operatorId: "221235"
  },
  {
    name: "Claudia",
    surname: "Maggi",
    gender: "F",
    signature: "",
    email: "",
    id: "",
    operatorId: "221236"
  }
]

// Es. "Dott.ssa Giorgia Mazzoni"
export const operatorLabel = (user) =>
  `${user.gender === 'F' ? 'Dott.ssa' : 'Dott.'} ${user.name} ${user.surname}`
