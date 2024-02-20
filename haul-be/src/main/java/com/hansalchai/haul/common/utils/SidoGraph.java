package com.hansalchai.haul.common.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import lombok.Getter;

@Getter
public class SidoGraph {
	static{
		DataStructureInitialize();
		NameInitialize();
		GraphInitialize();
	}
	//code table
	public static List<ArrayList<Integer>> graph;
	public static List<String> name ;
	public static Map<String, Integer> index;

	private static  void DataStructureInitialize(){
		graph = new ArrayList<>();
		name = new ArrayList<>();
		index = new HashMap<>();
	}

	private static void NameInitialize(){
		name.add("세종특별자치시"); //0
		name.add("제주특별자치도"); //1
		name.add("경상남도"); //2
		name.add("경상북도"); //3
		name.add("전라남도"); //4
		name.add("충청남도"); //5
		name.add("충청북도"); //6
		name.add("경기도"); //7
		name.add("울산광역시"); //8
		name.add("대전광역시"); //9
		name.add("광주광역시"); //10
		name.add("인천광역시"); //11
		name.add("대구광역시"); //12
		name.add("부산광역시"); // 13
		name.add("서울특별시"); // 14
		name.add("강원특별자치도"); //15
		name.add("전북특별자치도"); //16
		index = IntStream.range(0, name.size())
			.boxed()
			.collect(Collectors.toMap(name::get, i -> i));
	}

	private static void GraphInitialize(){
		ArrayList<Integer> inner = new ArrayList<>(); // 0. 세종
		inner.add(5); //충청남도
		inner.add(6); //충청북도
		inner.add(9); //대전
		inner.add(16); //전북
		graph.add(inner);

		inner = new ArrayList<>(); // 1. 제주도
		inner.add(13); // 부산
		graph.add(inner);

		inner = new ArrayList<>(); // 2. 경상남도
		inner.add(12); // 대구
		inner.add(13); // 부산
		inner.add(16); // 전북
		graph.add(inner);

		inner = new ArrayList<>(); // 3. 경상북도
		inner.add(8); // 울산
		inner.add(12); // 대구
		graph.add(inner);

		inner = new ArrayList<>(); // 4. 전라남도
		inner.add(10); // 광주광역시
		inner.add(16); // 전북
		graph.add(inner);

		inner = new ArrayList<>(); // 5. 충청남도
		inner.add(0); // 세종
		inner.add(6); // 충청북도
		inner.add(7); // 경기
		graph.add(inner);

		inner = new ArrayList<>(); // 6. 충청북도
		inner.add(5); // 충청남도
		inner.add(7); // 경기도
		inner.add(15); // 강원도
		inner.add(16); // 전북
		graph.add(inner);

		inner = new ArrayList<>(); // 7. 경기도
		inner.add(5); // 충청남도
		inner.add(6); // 충청북도
		inner.add(11); // 인천
		inner.add(14); // 서울
		inner.add(15); // 강원도
		graph.add(inner);

		inner = new ArrayList<>(); // 8. 울산광역시
		inner.add(3); // 경북
		inner.add(12); // 대구
		inner.add(13); // 부산
		graph.add(inner);

		inner = new ArrayList<>(); // 9. 대전광역시
		inner.add(0); // 세종
		inner.add(12); // 대구
		inner.add(16); // 전북
		graph.add(inner);

		inner = new ArrayList<>(); // 10. 광주광역시
		inner.add(4); // 전남
		inner.add(16); // 전북
		graph.add(inner);

		inner = new ArrayList<>(); // 11. 인천
		inner.add(7); // 경기도
		inner.add(14); // 서울
		graph.add(inner);

		inner = new ArrayList<>(); // 12. 대구
		inner.add(2); // 경남
		inner.add(3); // 경북
		inner.add(8); // 울산
		inner.add(9); // 대전광역시
		graph.add(inner);

		inner = new ArrayList<>(); // 13. 부산
		inner.add(1); // 제주도
		inner.add(2); // 경남
		inner.add(8); // 울산
		graph.add(inner);

		inner = new ArrayList<>(); // 14. 서울
		inner.add(7); // 경기도
		inner.add(11); // 인천
		inner.add(15); // 강원도
		graph.add(inner);

		inner = new ArrayList<>(); // 15. 강원도
		inner.add(6); // 충청북도
		inner.add(7); // 경기도
		inner.add(14); // 서울
		graph.add(inner);

		inner = new ArrayList<>(); // 16. 전북
		inner.add(0); // 세종
		inner.add(2); // 경남
		inner.add(4); // 전라남도
		inner.add(9); // 대전
		inner.add(10); // 광주
		graph.add(inner);
	}

	public static List<String> sidoSort(String key){
		if (name.stream().noneMatch(name -> name.equals(key))) {
			throw new IllegalArgumentException("해당 이름을 찾을 수 없습니다: ");
		}

		ArrayList<String> sorted = new ArrayList<>();
		ArrayList<Boolean> visited = IntStream.range(0, name.size())
			.mapToObj(i -> false)
			.collect(Collectors.toCollection(ArrayList::new));
		Queue<Integer> queue = new LinkedList<>();

		sorted.add(key);
		queue.offer(index.get(key));
		visited.set(index.get(key), true);

		while(!queue.isEmpty()) {
			int nodeIndex = queue.poll();
			for(int i=0; i < graph.get(nodeIndex).size(); i++) {
				int temp = graph.get(nodeIndex).get(i);
				if(!visited.get(temp)) {
					sorted.add(name.get(temp));
					visited.set(temp, true);
					queue.offer(temp);
				}
			}
		}

		return sorted;
	}
}
