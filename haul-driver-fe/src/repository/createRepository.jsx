const dummyPlanData = [
  {
    id: 0,
    status: "before",
    src: "학동역",
    dst: "교대역",
    time: "12:12:12:12:12",
    fee: "10000"
  },
  {
    id: 1,
    status: "moving",
    src: "학동역",
    dst: "교대역",
    time: "12:12:12:12:12",
    fee: "5000"
  },
  {
    id: 2,
    status: "after",
    src: "학동역",
    dst: "교대역",
    time: "12:12:12:12:12",
    fee: "1"
  }
];

export async function getUserSummaryList({ page, sortBy }) {
  try {
    return {
      success: true,
      data: {
        lastPage: false,
        reservationInfoDTOS: [
          ...dummyPlanData,
          ...dummyPlanData,
          ...dummyPlanData,
          dummyPlanData[0]
        ]
      }
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getUserReservationDetails({ planID }) {
  try {
    return { success: true, data: dummyPlanData[0] };
  } catch (error) {
    console.error(error);
  }
}
