import moment from "moment"

const curDate = moment()

const dates = []

for (var i = 0; i < 7; i++) {
  dates.push(curDate.subtract(i, "d").format("YYYY-MM-DD"))
}

export default dates;