package com.hansalchai.haul.common.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/*
* 용달 화물 가격에 대한 테이블
*
* feeTable은 Key로 KeyArray에 해당하는 변수로
* a~b 13000를 의미함
* ex) 1000kg 트럭 -> [a][b][13000] 형태로 저장함.
*
* findCost는 lowerbound로 구현했고 value값에 해당하는 a의 index를 nlog(n)에 찾아줌.
* ex) 1300, 13km -> 값
*
* */
public class CargoFeeTable {
	private static final Map<Integer, List<int[]> > feeTable = new HashMap<>();
	public static List<List<int[]>> test = null;
	// 0.5, 1, 5, 8, 15T
	private static final int[] keyArray = {500, 1000, 5000, 8000, 15000};
	// 각 Ton별 초기 가격
	private static final int[] costArray = {25000, 45000, 110000, 160000, 210000};
	// 가격 증가량
	private static final int[] costAddArray = {1000, 1000, 3000, 3000, 4000};

	static {
		initializeFeeTable();
	}

	static class StartEnd {
		int start;
		int end;

		StartEnd(int start, int end) {
			this.start = start;
			this.end = end;
		}
	}

	private static void initializeFeeTable() {

		int carTotal = keyArray.length;

		List<List<int[]>> list = IntStream.range(0, 5)
			.mapToObj(i -> new ArrayList<int[]>())
			.collect(Collectors.toList());

		StartEnd startEnd = new StartEnd(1, 2);

		//1 ~ 30
		processRange(list, costArray, costAddArray, startEnd, carTotal, 14, 2);
		costAddArray[0] += 1000;
		costAddArray[1] += 1000;
		// 31 ~ 50
		processRange(list, costArray, costAddArray, startEnd, carTotal, 10, 2);
		costAddArray[0] += 3000;
		costAddArray[1] += 3000;
		costAddArray[2] += 3000;
		costAddArray[3] += 3000;
		costAddArray[4] += 4000;
		// 50 ~ 100
		processRange(list, costArray, costAddArray, startEnd, carTotal, 10, 5);
		costAddArray[0] += 2000;
		costAddArray[1] += 2000;
		costAddArray[2] += 4000;
		costAddArray[3] += 4000;
		costAddArray[4] += 4000;
		// 100 ~ 200
		processRange(list, costArray, costAddArray, startEnd, carTotal, 10, 10);
		costAddArray[0] += 3000;
		costAddArray[1] += 3000;
		costAddArray[2] += 5000;
		costAddArray[3] += 5000;
		costAddArray[4] += 5000;
		processRange(list, costArray, costAddArray, startEnd, carTotal, 31, 10);

		IntStream.range(0, keyArray.length).forEach(i -> feeTable.put(keyArray[i], list.get(i)));
		test = list;
	}

	public static void processRange(List<List<int[]>> list, int[] costArray, int[] costAddArray, StartEnd startEnd,
		int carTotal, int repeatCount, int diff) {
		IntStream.range(0, repeatCount).forEach(i -> {
			IntStream.range(0, carTotal).forEach(j -> {
				list.get(j).add(new int[]{startEnd.start, startEnd.end, costArray[j]});
				costArray[j] += costAddArray[j];
			});
			startEnd.start += diff;
			startEnd.end += diff;
		});
	}

	public static int findWhichTruck(int weight){
		for(int i = keyArray.length-1; i >= 0; i--){
			if(keyArray[i] <= weight)
				return keyArray[i+1];
		}
		return keyArray[0];
	}

	public static int[] findCost(int weight, int distance) {
		//몇kg 몇대 가격
		int[] ret = new int[]{0, 0, Integer.MAX_VALUE};
		for(int truckWeight : keyArray){
			List<int[]> list = feeTable.get(truckWeight);
			int hi = list.size() - 1;
			int lo = 0;
			while (lo < hi) {
				int mid = (lo + hi) / 2;
				if (distance > list.get(mid)[0]) {
					lo = mid + 1;
				} else {
					hi = mid;
				}
			}

			int num = (weight + truckWeight - 1) / truckWeight;
			int cost = list.get(lo)[2];
			if(num * cost < ret[2])
				ret = new int[]{ truckWeight, num,num*cost };
		}
		return ret;
	}
}
