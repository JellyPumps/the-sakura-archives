export function move_towards(person, destination_position, speed) {
    let distance_2_x = destination_position.x - person.position.x;
    let distance_2_y = destination_position.y - person.position.y;
    let distance = Math.sqrt(distance_2_x**2 + distance_2_y**2);

    if (distance <= speed) {
        person.position.x = destination_position.x;
        person.position.y = destination_position.y;
    } else {
        person.position.x += (distance_2_x / distance) * speed;
        person.position.y += (distance_2_y / distance) * speed;

        distance_2_x = destination_position.x - person.position.x;
        distance_2_y = destination_position.y - person.position.y;
        distance = Math.sqrt(distance_2_x**2 + distance_2_y**2);
    }

    return distance;

}