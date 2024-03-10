package com.hansalchai.haul.reservation.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReservation is a Querydsl query type for Reservation
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReservation extends EntityPathBase<Reservation> {

    private static final long serialVersionUID = -1037351434L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReservation reservation = new QReservation("reservation");

    public final com.hansalchai.haul.common.utils.QBaseTime _super = new com.hansalchai.haul.common.utils.QBaseTime(this);

    public final com.hansalchai.haul.car.entity.QCar car;

    public final QCargo cargo;

    public final QCargoOption cargoOption;

    public final NumberPath<Integer> count = createNumber("count", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final DatePath<java.time.LocalDate> date = createDate("date", java.time.LocalDate.class);

    //inherited
    public final BooleanPath deleted = _super.deleted;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> deletedAt = _super.deletedAt;

    public final QDestination destination;

    public final NumberPath<Double> distance = createNumber("distance", Double.class);

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    public final StringPath number = createString("number");

    public final com.hansalchai.haul.owner.entity.QOwner owner;

    public final NumberPath<Long> reservationId = createNumber("reservationId", Long.class);

    public final QSource source;

    public final TimePath<java.time.LocalTime> time = createTime("time", java.time.LocalTime.class);

    public final QTransport transport;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final com.hansalchai.haul.user.entity.QUsers user;

    public final NumberPath<Long> version = createNumber("version", Long.class);

    public QReservation(String variable) {
        this(Reservation.class, forVariable(variable), INITS);
    }

    public QReservation(Path<? extends Reservation> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReservation(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReservation(PathMetadata metadata, PathInits inits) {
        this(Reservation.class, metadata, inits);
    }

    public QReservation(Class<? extends Reservation> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.car = inits.isInitialized("car") ? new com.hansalchai.haul.car.entity.QCar(forProperty("car")) : null;
        this.cargo = inits.isInitialized("cargo") ? new QCargo(forProperty("cargo")) : null;
        this.cargoOption = inits.isInitialized("cargoOption") ? new QCargoOption(forProperty("cargoOption")) : null;
        this.destination = inits.isInitialized("destination") ? new QDestination(forProperty("destination")) : null;
        this.owner = inits.isInitialized("owner") ? new com.hansalchai.haul.owner.entity.QOwner(forProperty("owner"), inits.get("owner")) : null;
        this.source = inits.isInitialized("source") ? new QSource(forProperty("source")) : null;
        this.transport = inits.isInitialized("transport") ? new QTransport(forProperty("transport")) : null;
        this.user = inits.isInitialized("user") ? new com.hansalchai.haul.user.entity.QUsers(forProperty("user")) : null;
    }

}

