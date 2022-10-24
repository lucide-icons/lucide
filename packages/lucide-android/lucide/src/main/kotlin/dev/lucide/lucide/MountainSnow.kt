package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.MountainSnow: ImageVector
    get() {
        if (_mountainSnow != null) {
            return _mountainSnow!!
        }
        _mountainSnow = Builder(name = "MountainSnow", defaultWidth = 24.0.dp, defaultHeight =
                24.0.dp, viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(8.0f, 3.0f)
                lineToRelative(4.0f, 8.0f)
                lineToRelative(5.0f, -5.0f)
                lineToRelative(5.0f, 15.0f)
                horizontalLineTo(2.0f)
                lineTo(8.0f, 3.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(4.14f, 15.08f)
                curveToRelative(2.62f, -1.57f, 5.24f, -1.43f, 7.86f, 0.42f)
                curveToRelative(2.74f, 1.94f, 5.49f, 2.0f, 8.23f, 0.19f)
            }
        }
        .build()
        return _mountainSnow!!
    }

private var _mountainSnow: ImageVector? = null
