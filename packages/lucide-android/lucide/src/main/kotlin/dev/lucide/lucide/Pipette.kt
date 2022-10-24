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

public val Lucide.Pipette: ImageVector
    get() {
        if (_pipette != null) {
            return _pipette!!
        }
        _pipette = Builder(name = "Pipette", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(2.0f, 22.0f)
                lineToRelative(1.0f, -1.0f)
                horizontalLineToRelative(3.0f)
                lineToRelative(9.0f, -9.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(3.0f, 21.0f)
                verticalLineToRelative(-3.0f)
                lineToRelative(9.0f, -9.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(15.0f, 6.0f)
                lineToRelative(3.4f, -3.4f)
                arcToRelative(2.1f, 2.1f, 0.0f, true, true, 3.0f, 3.0f)
                lineTo(18.0f, 9.0f)
                lineToRelative(0.4f, 0.4f)
                arcToRelative(2.1f, 2.1f, 0.0f, true, true, -3.0f, 3.0f)
                lineToRelative(-3.8f, -3.8f)
                arcToRelative(2.1f, 2.1f, 0.0f, true, true, 3.0f, -3.0f)
                lineToRelative(0.4f, 0.4f)
                close()
            }
        }
        .build()
        return _pipette!!
    }

private var _pipette: ImageVector? = null
