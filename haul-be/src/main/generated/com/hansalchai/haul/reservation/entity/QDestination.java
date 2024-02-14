package com.hansalchai.haul.reservation.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QDestination is a Querydsl query type for Destination
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDestination extends EntityPathBase<Destination> {

    private static final long serialVersionUID = -904116680L;

    public static final QDestination destination = new QDestination("destination");

    public final com.hansalchai.haul.common.utils.QBaseTime _super = new com.hansalchai.haul.common.utils.QBaseTime(this);

    public final StringPath address = createString("address");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final BooleanPath deleted = _super.deleted;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> deletedAt = _super.deletedAt;

    public final NumberPath<Long> destinationId = createNumber("destinationId", Long.class);

    public final StringPath detailAddress = createString("detailAddress");

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    public final NumberPath<java.math.BigDecimal> latitude = createNumber("latitude", java.math.BigDecimal.class);

    public final NumberPath<java.math.BigDecimal> longitude = createNumber("longitude", java.math.BigDecimal.class);

    public final StringPath name = createString("name");

    public final StringPath tel = createString("tel");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QDestination(String variable) {
        super(Destination.class, forVariable(variable));
    }

    public QDestination(Path<? extends Destination> path) {
        super(path.getType(), path.getMetadata());
    }

    public QDestination(PathMetadata metadata) {
        super(Destination.class, metadata);
    }

}

