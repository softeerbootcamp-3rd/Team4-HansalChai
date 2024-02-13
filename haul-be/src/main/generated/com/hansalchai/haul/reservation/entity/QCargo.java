package com.hansalchai.haul.reservation.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCargo is a Querydsl query type for Cargo
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCargo extends EntityPathBase<Cargo> {

    private static final long serialVersionUID = -712617626L;

    public static final QCargo cargo = new QCargo("cargo");

    public final com.hansalchai.haul.common.utils.QBaseTime _super = new com.hansalchai.haul.common.utils.QBaseTime(this);

    public final NumberPath<Long> cargoId = createNumber("cargoId", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final BooleanPath deleted = _super.deleted;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> deletedAt = _super.deletedAt;

    public final NumberPath<Integer> height = createNumber("height", Integer.class);

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    public final NumberPath<Integer> length = createNumber("length", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final NumberPath<Integer> weight = createNumber("weight", Integer.class);

    public final NumberPath<Integer> width = createNumber("width", Integer.class);

    public QCargo(String variable) {
        super(Cargo.class, forVariable(variable));
    }

    public QCargo(Path<? extends Cargo> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCargo(PathMetadata metadata) {
        super(Cargo.class, metadata);
    }

}

