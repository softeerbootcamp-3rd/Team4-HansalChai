package com.hansalchai.haul.common.utils;

import static com.hansalchai.haul.common.utils.ErrorCode.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Queue;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.data.util.Pair;

import com.hansalchai.haul.common.exceptions.NotFoundException;

import lombok.Getter;

@Getter
public class SidoGraph {
	static{
		dataStructureInitialize();
		nameInitialize();
		graphInitialize();
		sidoSortInitialize();
	}
	//code table
	public static List<ArrayList<Integer>> graph;
	public static List<String> sidoNames;
	public static Map<String, Integer> index;
	public static Map<String, Map<Integer, ArrayList<String>>> sidoSortedMap;

	private static  void dataStructureInitialize(){
		graph = new ArrayList<>();
		sidoNames = new ArrayList<>();
		index = new HashMap<>();
	}

	private static void nameInitialize(){
		sidoNames.add("세종특별자치시"); //0
		sidoNames.add("제주특별자치도"); //1
		sidoNames.add("경남"); //2
		sidoNames.add("경북"); //3
		sidoNames.add("전남"); //4
		sidoNames.add("충남"); //5
		sidoNames.add("충북"); //6
		sidoNames.add("경기"); //7
		sidoNames.add("울산"); //8
		sidoNames.add("대전"); //9
		sidoNames.add("광주"); //10
		sidoNames.add("인천"); //11
		sidoNames.add("대구"); //12
		sidoNames.add("부산"); // 13
		sidoNames.add("서울"); // 14
		sidoNames.add("강원특별자치도"); //15
		sidoNames.add("전북특별자치도"); //16
		index = IntStream.range(0, sidoNames.size())
			.boxed()
			.collect(Collectors.toMap(sidoNames::get, i -> i));
	}

	private static void graphInitialize(){
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

	private static Map<Integer, ArrayList<String>> sidoSort(String key){
		if (sidoNames.stream().noneMatch(name -> name.equals(key))) {
			throw new NotFoundException(SIDO_NOT_FOUND);
		}
		Map<Integer, ArrayList<String>> depthSorted = new HashMap<>();

		ArrayList<Boolean> visited = IntStream.range(0, sidoNames.size())
			.mapToObj(i -> false)
			.collect(Collectors.toCollection(ArrayList::new));
		Queue<Pair<Integer, Integer>> queue = new LinkedList<>();

		queue.offer(Pair.of(index.get(key), 1));
		visited.set(index.get(key), true);

		while(!queue.isEmpty()) {
			Pair<Integer, Integer> front = queue.poll();
			int nodeIndex = front.getFirst();
			int depth = front.getSecond();

			ArrayList<String> depthList = depthSorted.getOrDefault(depth, new ArrayList<>());
			depthList.add(sidoNames.get(nodeIndex));
			depthSorted.put(depth, depthList);

			for(int i=0; i < graph.get(nodeIndex).size(); i++) {
				int temp = graph.get(nodeIndex).get(i);
				if(!visited.get(temp)) {
					visited.set(temp, true);
					queue.offer(Pair.of(temp, depth + 1));
				}
			}
		}

		Map<Integer, ArrayList<String>> updatedDepthSorted = new HashMap<>();

		// 깊이마다 이전 모든 깊이의 값을 추가
		depthSorted.keySet().forEach(currentDepth -> {
			ArrayList<String> currentValues = new ArrayList<>();
			IntStream.rangeClosed(1, currentDepth)
				.mapToObj(depthSorted::get)
				.filter(Objects::nonNull)
				.flatMap(List::stream)
				.distinct()
				.forEach(currentValues::add);
			updatedDepthSorted.put(currentDepth, currentValues);
		});

		return updatedDepthSorted;
	}

	private static void sidoSortInitialize() {
		sidoSortedMap = sidoNames.stream()
			.collect(Collectors.toMap(
				Function.identity(),
				SidoGraph::sidoSort
			));
	}

	public static ArrayList<String> getSidoByDepth(String key, int depth){
		if (sidoNames.stream().noneMatch(name -> name.equals(key))) {
			throw new NotFoundException(SIDO_NOT_FOUND);
		}

		return sidoSortedMap.get(key).get(depth);
	}

}
