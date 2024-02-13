package com.hansalchai.haul.owner.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QOwner is a Querydsl query type for Owner
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QOwner extends EntityPathBase<Owner> {

    private static final long serialVersionUID = -589390058L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QOwner owner = new QOwner("owner");

    public final com.hansalchai.haul.common.utils.QBaseTime _super = new com.hansalchai.haul.common.utils.QBaseTime(this);

    public final com.hansalchai.haul.car.entity.QCar car;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final BooleanPath deleted = _super.deleted;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> deletedAt = _super.deletedAt;

    public final com.hansalchai.haul.driver.entity.QDriver driver;

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    public final StringPath number = createString("number");

    public final NumberPath<Long> ownerId = createNumber("ownerId", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QOwner(String variable) {
        this(Owner.class, forVariable(variable), INITS);
    }

    public QOwner(Path<? extends Owner> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QOwner(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QOwner(PathMetadata metadata, PathInits inits) {
        this(Owner.class, metadata, inits);
    }

    public QOwner(Class<? extends Owner> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.car = inits.isInitialized("car") ? new com.hansalchai.haul.car.entity.QCar(forProperty("car")) : null;
        this.driver = inits.isInitialized("driver") ? new com.hansalchai.haul.driver.entity.QDriver(forProperty("driver")) : null;
    }

}

