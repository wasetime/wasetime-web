const getTotalMins = (hours, mins) => {
  return 60 * hours + mins;
};

export const busSchedule = {
  // Weekday schedule
  weekday: {
    fromWasedaToNishiWaseda: {
      occurrences: [
        // Converted to minutes. E.g., 09:15 = 9 * 60 + 15 = 555
        getTotalMins(9, 15),
        getTotalMins(9, 45),
        getTotalMins(10, 10),
        getTotalMins(10, 35),
        getTotalMins(10, 45),
        getTotalMins(11, 20),
        getTotalMins(11, 50),
        getTotalMins(12, 5),
        getTotalMins(12, 15),
        getTotalMins(12, 45),
        getTotalMins(13, 15),
        getTotalMins(13, 45),
        getTotalMins(14, 0),
        getTotalMins(14, 15),
        getTotalMins(14, 35),
        getTotalMins(14, 50),
        getTotalMins(15, 15),
        getTotalMins(15, 40),
        getTotalMins(16, 5),
        getTotalMins(16, 20),
        getTotalMins(16, 40),
        getTotalMins(17, 0),
        getTotalMins(17, 15),
        getTotalMins(17, 40),
        getTotalMins(18, 5),
      ],
      // Remarks written in the pdf file.
      remarks_jp: {
        [getTotalMins(
          12,
          5
        ).toString()]: "西早稲田キャンパス経由先端生命医科学センター行き。先端先端生命医科学センターは降車のみ。乗車はできません。",
        [getTotalMins(
          12,
          15
        ).toString()]: "先端生命医科学センター経由西早稲田キャンパス行き。先端先端生命医科学センターは降車のみ。乗車はできません。",
        [getTotalMins(14, 50).toString()]: "中型バスとマイクロバスの運行",
        [getTotalMins(16, 40).toString()]: "中型バスとマイクロバスの運行",
        [getTotalMins(18, 5).toString()]: "中型バスとマイクロバスの運行",
      },
      remarks_en: {
        [getTotalMins(
          12,
          5
        ).toString()]: "To TWIns via Nishiwaseda campus. Get-offs ONLY at TWIns. The stop is located at 'Tokyo Joshiidaimae'.",
        [getTotalMins(
          12,
          15
        ).toString()]: "To Nishiwaseda campus via TWIns. Get-offs ONLY at TWIns. The stop is located at 'Tokyo Joshiidaimae'.",
        [getTotalMins(
          14,
          50
        ).toString()]: "Operation of middle-size bus and minibus.",
        [getTotalMins(
          16,
          40
        ).toString()]: "Operation of middle-size bus and minibus.",
        [getTotalMins(
          18,
          5
        ).toString()]: "Operation of middle-size bus and minibus.",
      },
    },
    fromNishiWasedaToWaseda: {
      occurrences: [
        getTotalMins(9, 15),
        getTotalMins(9, 45),
        getTotalMins(10, 10),
        getTotalMins(10, 35),
        getTotalMins(10, 45),
        getTotalMins(11, 5),
        getTotalMins(11, 40),
        getTotalMins(12, 5),
        getTotalMins(12, 20),
        getTotalMins(12, 45),
        getTotalMins(13, 0),
        getTotalMins(13, 30),
        getTotalMins(14, 0),
        getTotalMins(14, 15),
        getTotalMins(14, 35),
        getTotalMins(14, 50),
        getTotalMins(15, 15),
        getTotalMins(15, 40),
        getTotalMins(16, 5),
        getTotalMins(16, 20),
        getTotalMins(16, 40),
        getTotalMins(17, 0),
        getTotalMins(17, 15),
        getTotalMins(17, 40),
        getTotalMins(18, 5),
        getTotalMins(18, 20),
      ],
      remarks_en: {
        [getTotalMins(
          12,
          5
        ).toString()]: "To TWIns via Waseda campus. Get-offs ONLY at TWIns. The stop is located at 'Tokyo Joshiidaimae'.",
        [getTotalMins(
          12,
          20
        ).toString()]: "To Waseda campus via TWIns. Get-offs ONLY at TWIns. The stop is located at 'Tokyo Joshiidaimae'.",
        [getTotalMins(
          14,
          35
        ).toString()]: "Operation of middle-size bus and minibus.",
        [getTotalMins(
          16,
          20
        ).toString()]: "Operation of middle-size bus and minibus.",
        [getTotalMins(
          18,
          20
        ).toString()]: "Operation of middle-size bus and minibus. Possibility of early/late departure.",
      },
      remarks_jp: {
        [getTotalMins(
          12,
          5
        ).toString()]: "早稲田キャンパス経由行き。先端先端生命医科学センターは降車のみ。乗車はできません。",
        [getTotalMins(
          12,
          20
        ).toString()]: "先端生命医科学センター経由早稲田キャンパス行き。先端先端生命医科学センターは降車のみ。乗車はできません。",
        [getTotalMins(14, 35).toString()]: "中型バスとマイクロバスの運行",
        [getTotalMins(16, 20).toString()]: "中型バスとマイクロバスの運行",
        [getTotalMins(
          18,
          20
        ).toString()]: "中型バスとマイクロバスの運行。出発時間は目安になります。",
      },
    },
  },
  // Saturday schedule
  saturday: {
    fromWasedaToNishiWaseda: {
      occurrences: [
        //560, 620, 650, 690, 720, 750, 825, 855, 890, 950, 995
        getTotalMins(9, 20),
        getTotalMins(10, 20),
        getTotalMins(10, 50),
        getTotalMins(11, 30),
        getTotalMins(12, 0),
        getTotalMins(12, 30),
        getTotalMins(13, 45),
        getTotalMins(14, 15),
        getTotalMins(14, 50),
        getTotalMins(15, 50),
        getTotalMins(16, 35),
      ],
      remarks_en: {},
      remarks_jp: {},
    },
    fromNishiWasedaToWaseda: {
      occurrences: [
        // 575, 635, 665, 705, 735, 765, 840, 875, 920, 980
        getTotalMins(9, 35),
        getTotalMins(10, 35),
        getTotalMins(11, 5),
        getTotalMins(11, 45),
        getTotalMins(12, 15),
        getTotalMins(12, 45),
        getTotalMins(14, 0),
        getTotalMins(14, 35),
        getTotalMins(15, 20),
        getTotalMins(16, 15),
      ],
      remarks_en: {},
      remarks_jp: {},
    },
  },
  // Special schedules
  exceptions: {
    outOfService: {
      // Format is "month": [array of dates]
      // Month is 0-based. So "0" is January and "11" is December.
      // Date is 1-based. So 1 is the first date of the month.
      // E.g., "0": [1,2,3,4,5] means January 01 to Janurary 05.
      0: [1, 2, 3, 4],
      1: [
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        29,
      ],
      2: [7, 14, 21, 25, 28],
      3: [1],
      4: [1, 2],
      7: [
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
      ],
      8: [7],
      10: [1],
      11: [28, 29, 30, 31],
    },
    weekdaySchedule: {
      4: [6],
      6: [15],
      9: [14],
    },
    specialSchedule: {
      7: [3, 4],
      10: [2, 3],
    },
    saturdaySchedule: {
      1: [25, 26, 27, 28, 29],
      2: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
      ],
      8: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      11: [24, 25, 26, 27],
    },
  },
};
