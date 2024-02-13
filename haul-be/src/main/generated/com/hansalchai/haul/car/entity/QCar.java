package com.hansalchai.haul.car.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCar is a Querydsl query type for Car
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCar extends EntityPathBase<Car> {

    private static final long serialVersionUID = -1357980170L;

    public static final QCar car = new QCar("car");

    public final com.hansalchai.haul.common.utils.QBaseTime _super = new com.hansalchai.haul.common.utils.QBaseTime(this);

    public final NumberPath<Long> carId = createNumber("carId", Long.class);

    public final EnumPath<com.hansalchai.haul.car.constants.CarCategory> category = createEnum("category", com.hansalchai.haul.car.constants.CarCategory.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final BooleanPath deleted = _super.deleted;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> deletedAt = _super.deletedAt;

    public final NumberPath<Integer> height = createNumber("height", Integer.class);

    public final BooleanPath isboxtruck = createBoolean("isboxtruck");

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    public final NumberPath<Integer> length = createNumber("length", Integer.class);

    public final StringPath model = createString("model");

    public final StringPath photo = createString("photo");

    public final EnumPath<com.hansalchai.haul.car.constants.CarType> type = createEnum("type", com.hansalchai.haul.car.constants.CarType.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final NumberPath<Integer> weight = createNumber("weight", Integer.class);

    public final NumberPath<Integer> width = createNumber("width", Integer.class);

    public QCar(String variable) {
        super(Car.class, forVariable(variable));
    }

    public QCar(Path<? extends Car> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCar(PathMetadata metadata) {
        super(Car.class, metadata);
    }

}

